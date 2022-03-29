import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Slider from "react-slick";
import { TodoListComponent } from '../apps/TodoList';
import { PhLineChartComponent } from "../components/phLineChartComponent";
import ReactHlsPlayer from "react-hls-player";
import { VectorMap } from "react-jvectormap"
import * as netatmoAuth from "../../services/netatmo-authorization-services";
import * as dashboardService from "../../services/dashboard-services";
import axios from "axios";
import { times } from 'chartist';
import Navbar from '../shared/Navbar';
import Sidebar from '../shared/Sidebar';
import Footer from '../shared/Footer';
import { myContext } from '../context';



const mapData = {
  "BZ": 75.00,
  "US": 56.25,
  "AU": 15.45,
  "GB": 25.00,
  "RO": 10.25,
  "GE": 33.25
}

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: null,
      cameraData: null,
      phWeekData: null,
      renderNetatmo: false,
      renderSecurity: false,
      renderPoolData: false,
      videoEventData: null
    }
  }
  static ctx = myContext;

  transactionHistoryData = {
    labels: ["Paypal", "Stripe", "Cash"],
    datasets: [{
      data: [55, 25, 20],
      backgroundColor: [
        "#111111", "#00d25b", "#ffab00"
      ]
    }
    ]
  };

  transactionHistoryOptions = {
    responsive: true,
    maintainAspectRatio: true,
    segmentShowStroke: false,
    cutoutPercentage: 70,
    elements: {
      arc: {
        borderWidth: 0
      }
    },
    legend: {
      display: false
    },
    tooltips: {
      enabled: true
    }
  }

  sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }
  toggleProBanner() {
    document.querySelector('.proBanner').classList.toggle("hide");
  }

  async componentDidMount() {
    // Dashboard stuff
    this.onRouteChanged();

    // Get Process ENV data to determine what to render
    const renderData = await dashboardService.getRenderData();
    const renderNetatmo = renderData.CLIENT_ID && renderData.CLIENT_SECRET && renderData.ACCOUNT_EMAIL && renderData.ACCOUNT_PASSWORD && renderData.INDOOR_MAC
    const renderSecurity = renderData.SECURITY_NETATMO
    this.setState({
      renderNetatmo: renderNetatmo,
      renderSecurity: renderSecurity,
      renderPoolData: renderData.POOL_DATA
    });
    // Get Weather Data
    const weatherData = await dashboardService.getCurrentWeather();
    this.setState({
      weatherData: weatherData
    });

    // Get Camera Data
    const cameraData = await dashboardService.getVideoData();
    this.setState({
      cameraData: cameraData
    })

    // Get Camera Event Data
    const cameraEventData = await dashboardService.getVideoEventData();
    const desiredEvents = new Set(["person", "animal", "movement"])
    cameraEventData.events = cameraEventData.events.filter((event) => {
      if (desiredEvents.has(event.type)){
        return true
      }
      else{
        return false
      }
    })
    this.setState({
      videoEventData: cameraEventData.events
    })

    // Get PH Week Data
    const phWeekData = await dashboardService.getPHWeek();
    this.setState({
      phWeekData: phWeekData
    })


  }

  // METHODS
  getTemperatureTrend = (trend) => {
    switch (trend) {
      case "down":
        return (
          <div className="icon icon-box-danger">
            <span className="mdi mdi-arrow-bottom-right icon-item"></span>
          </div>
        )

      case "up":
        return (
          <div className="icon icon-box-success ">
            <span className="mdi mdi-arrow-top-right icon-item"></span>
          </div>
        )

      default:
        return (
          <div className="icon icon-box-success ">
            <span className="mdi mdi-arrow-right icon-item"></span>
          </div>
        )
    }
  }

  convertUnixTimestamp = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000)
    const hours = date.getHours()
    const minutes = "0" + date.getMinutes()
    const day = date.getDate()
    const month = date.getMonth() + 1

    console.log(hours)
    console.log(minutes)

    const returnString = String(day) + "." + String(month) + " - " + hours + ":" + minutes.substr(-2)

    return returnString
  }

  getCo2Status = (ppm) => {
    if (ppm === "N/A") {
      return <div></div>
    }
    else if (ppm < 425) {
      return (
        <div className="icon icon-box-success ">
          <span className="mdi mdi-check"></span>
        </div>
      )
    }
    else if (1180 > ppm > 425) {
      return (
        <div className="icon icon-box-danger ">
          <span className="mdi mdi-alert-circle-outline"></span>
        </div>
      )
    }
    else if (ppm > 1180) {
      return (
        <div className="icon icon-box-danger ">
          <span className="mdi mdi-alert-outline"></span>
        </div>
      )
    }
  }

  getCameraStreamURL = () => {
    let URL = "";
    if (this.state.cameraData !== null) {
      URL = this.state.cameraData.body.homes[0].cameras[0].vpn_url
    }
    const videoURL = URL + "/live/index.m3u8" // if localhost change to: /live/index_local/index.m3u8
    return videoURL
  }

  getCameraStatus = () => {
    try {
      if (this.state.cameraData.body.homes[0].cameras[0].vpn_url) {
        return <p className="text-success mb-1">LIVE</p>
      }
      else {
        return <p className="text-danger mb-1">OFFLINE</p>
      }
    }
    catch {
      return <p className="text-danger mb-1">OFFLINE</p>
    }
  }

  formatDatePH = (datetime) => {
    const time = datetime.slice(11, 16);
    const month = datetime.slice(5, 7);
    const day = datetime.slice(8, 10);

    return day + "/" + month + " at " + time
  }

  getPhStatus = (latestPH) => {
    if (latestPH === "N/A") {
      return <div></div>;

    }
    else if (8 > latestPH && latestPH > 6) {
      return (
        <div className="icon icon-box-success ">
          <span className="mdi mdi-check"></span>
        </div>
      )
    } else {
      return (
        <div className="icon icon-box-danger ">
          <span className="mdi mdi-alert-outline"></span>
        </div>
      )
    }
  }

  // SideBar Stuff
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }

  }

  onRouteChanged() {
    window.scrollTo(0, 0);
    const fullPageLayoutRoutes = ['/user-pages/login-2', "/"];
    for (let i = 0; i < fullPageLayoutRoutes.length; i++) {
      if (this.props.location.pathname === fullPageLayoutRoutes[i]) {
        this.setState({
          isFullPageLayout: true
        })
        document.querySelector('.page-body-wrapper').classList.add('full-page-wrapper');
        break;
      } else {
        this.setState({
          isFullPageLayout: false
        })
        document.querySelector('.page-body-wrapper').classList.remove('full-page-wrapper');
      }
    }
  }

  render() {
    let navbarComponent = !this.state.isFullPageLayout ? <Navbar /> : '';
    let sidebarComponent = !this.state.isFullPageLayout ? <Sidebar /> : '';
    let footerComponent = !this.state.isFullPageLayout ? <Footer /> : '';
    return (

      <div className="container-scroller">
        {console.log(this.state.videoEventData)}
        {sidebarComponent}
        <div className="container-fluid page-body-wrapper">
          {navbarComponent}
          <div className="main-panel">
            <div className="content-wrapper">
              <div>
                <div className="row">
                  {this.state.renderNetatmo &&
                    <>
                      <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
                        <div className="card">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-9">
                                <div className="d-flex align-items-center align-self-start">
                                  <h3 className="mb-0">{this?.state?.weatherData?.body?.devices[0]?.dashboard_data?.Temperature === undefined ? "N/A" : this.state.weatherData.body.devices[0].dashboard_data.Temperature + "°C"}</h3>
                                  <p className="text-primary ml-2 mb-0 font-weight-medium">{this?.state?.weatherData?.body?.devices[0]?.dashboard_data?.Humidity === undefined ? "N/A" : this.state.weatherData.body.devices[0].dashboard_data.Humidity + "%"}</p>
                                </div>
                              </div>
                              <div className="col-3">
                                {this.getTemperatureTrend(this?.state?.weatherData?.body?.devices[0]?.dashboard_data?.temp_trend === undefined ? "N/A" : this.state.weatherData.body.devices[0].dashboard_data.temp_trend)}
                              </div>
                            </div>
                            <h6 className="text-muted font-weight-normal">Temperatur Haus</h6>
                          </div>
                        </div>
                      </div>

                      <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
                        <div className="card">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-9">
                                <div className="d-flex align-items-center align-self-start">
                                  <h3 className="mb-0">{this?.state?.weatherData?.body?.devices[0]?.modules[0]?.dashboard_data?.Temperature === undefined ? "N/A" : this.state.weatherData.body.devices[0].modules[0].dashboard_data.Temperature + "°C"}</h3>
                                  <p className="text-primary ml-2 mb-0 font-weight-medium">{this?.state?.weatherData?.body?.devices[0]?.modules[0]?.dashboard_data?.Humidity === undefined ? "N/A" : this.state.weatherData.body.devices[0].modules[0].dashboard_data.Humidity + "%"}</p>
                                </div>
                              </div>
                              <div className="col-3">
                                {this.getTemperatureTrend(this?.state?.weatherData?.body?.devices[0]?.modules[0]?.dashboard_data?.temp_trend === undefined ? "N/A" : this.state.weatherData.body.devices[0].modules[0].dashboard_data.temp_trend)}
                              </div>
                            </div>
                            <h6 className="text-muted font-weight-normal">Temperatur Draußen</h6>
                          </div>
                        </div>
                      </div>

                      <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
                        <div className="card">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-9">
                                <div className="d-flex align-items-center align-self-start">
                                  <h3 className="mb-0">{this?.state?.weatherData?.body?.devices[0]?.dashboard_data?.CO2 === undefined ? "N/A" : this.state.weatherData.body.devices[0].dashboard_data.CO2 + " ppm"}</h3>
                                </div>
                              </div>
                              <div className="col-3">
                                {this.getCo2Status(this?.state?.weatherData?.body?.devices[0]?.dashboard_data?.CO2 === undefined ? "N/A" : this.state.weatherData.body.devices[0].dashboard_data.CO2)}
                              </div>
                            </div>
                            <h6 className="text-muted font-weight-normal">CO2 Innen</h6>
                          </div>
                        </div>
                      </div>
                    </>
                  }
                  {this.state.renderPoolData &&
                    <>
                      <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
                        <div className="card">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-9">
                                <div className="d-flex align-items-center align-self-start">
                                  <h3 className="mb-0">{this?.state?.phWeekData?.PH === undefined ? "N/A" : this.state.phWeekData[this.state.phWeekData.length - 1].PH + "PH"}</h3>
                                  <p className="text-success ml-2 mb-0 font-weight-medium">+3.5%</p>
                                </div>
                              </div>
                              <div className="col-3">
                                {this.getPhStatus((this?.state?.phWeekData?.PH === undefined ? "N/A" : this.state.phWeekData[this.state.phWeekData.length - 1].PH))}
                              </div>
                            </div>
                            <h6 className="text-muted font-weight-normal">Pool ({this?.state?.phWeekData?.PH === undefined ? "N/A" : this.formatDatePH((this.state.phWeekData[this.state.phWeekData.length - 1].Time))})</h6>
                          </div>
                        </div>
                      </div>
                    </>
                  }
                </div>
                <div className="row">
                  <div className="col-md-4 scroll grid-margin stretch-card">
                    <div className="card">
                      <div className="scroll">
                        <div className="card-body">
                          <h4 className="card-title">Ereignisse Videokamera Innen</h4>
                            <div style={{maxHeight: "100%"}}>
                              {this.state?.videoEventData?.slice(0,30).map((event) => {
                                return(
                                <div className="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3" style={{}} onClick={() => window.open(event.snapshot.url, "_blank")}>
                                  <div className="text-md-center text-xl-left">
                                      <h6 className="mb-1">{event.message.replace(/<\/?[^>]+(>|$)/g, "")}</h6>
                                      <p className="text-muted mb-0">{this.convertUnixTimestamp(event.time)}</p>
                                  </div>
                                  <div className="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
                                    <h6 className="font-weight-bold mb-0">{event.type.charAt(0).toUpperCase() + event.type.slice(1)}</h6>
                                  </div>
                                </div>)
                              })
                              }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8 grid-margin stretch-card">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex flex-row justify-content-between">
                          <h4 className="card-title mb-1">Videokamera Innen</h4>
                          {this.getCameraStatus()}
                        </div>
                        <ReactHlsPlayer
                          src={this.getCameraStreamURL()}
                          autoPlay={true}
                          controls={false}
                          muted={true}
                          width="100%"
                        />
                        {/* <div className="row">
                  <div className="col-12">
                    <div className="preview-list">
                      <div className="preview-item border-bottom">
                        <div className="preview-thumbnail">
                          <div className="preview-icon bg-primary">
                            <i className="mdi mdi-file-document"></i>
                          </div>
                        </div>
                        <div className="preview-item-content d-sm-flex flex-grow">
                          <div className="flex-grow">
                            <h6 className="preview-subject">Admin dashboard design</h6>
                            <p className="text-muted mb-0">Broadcast web app mockup</p>
                          </div>
                          <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                            <p className="text-muted">15 minutes ago</p>
                            <p className="text-muted mb-0">30 tasks, 5 issues </p>
                          </div>
                        </div>
                      </div>
                      <div className="preview-item border-bottom">
                        <div className="preview-thumbnail">
                          <div className="preview-icon bg-success">
                            <i className="mdi mdi-cloud-download"></i>
                          </div>
                        </div>
                        <div className="preview-item-content d-sm-flex flex-grow">
                          <div className="flex-grow">
                            <h6 className="preview-subject">Wordpress Development</h6>
                            <p className="text-muted mb-0">Upload new design</p>
                          </div>
                          <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                            <p className="text-muted">1 hour ago</p>
                            <p className="text-muted mb-0">23 tasks, 5 issues </p>
                          </div>
                        </div>
                      </div>
                      <div className="preview-item border-bottom">
                        <div className="preview-thumbnail">
                          <div className="preview-icon bg-info">
                            <i className="mdi mdi-clock"></i>
                          </div>
                        </div>
                        <div className="preview-item-content d-sm-flex flex-grow">
                          <div className="flex-grow">
                            <h6 className="preview-subject">Project meeting</h6>
                            <p className="text-muted mb-0">New project discussion</p>
                          </div>
                          <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                            <p className="text-muted">35 minutes ago</p>
                            <p className="text-muted mb-0">15 tasks, 2 issues</p>
                          </div>
                        </div>
                      </div>
                      <div className="preview-item border-bottom">
                        <div className="preview-thumbnail">
                          <div className="preview-icon bg-danger">
                            <i className="mdi mdi-email-open"></i>
                          </div>
                        </div>
                        <div className="preview-item-content d-sm-flex flex-grow">
                          <div className="flex-grow">
                            <h6 className="preview-subject">Broadcast Mail</h6>
                            <p className="text-muted mb-0">Sent release details to team</p>
                          </div>
                          <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                            <p className="text-muted">55 minutes ago</p>
                            <p className="text-muted mb-0">35 tasks, 7 issues </p>
                          </div>
                        </div>
                      </div>
                      <div className="preview-item">
                        <div className="preview-thumbnail">
                          <div className="preview-icon bg-warning">
                            <i className="mdi mdi-chart-pie"></i>
                          </div>
                        </div>
                        <div className="preview-item-content d-sm-flex flex-grow">
                          <div className="flex-grow">
                            <h6 className="preview-subject">UI Design</h6>
                            <p className="text-muted mb-0">New application planning</p>
                          </div>
                          <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                            <p className="text-muted">50 minutes ago</p>
                            <p className="text-muted mb-0">27 tasks, 4 issues </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                {this.state.renderPoolData &&
                  <>
                    <div className="row ">
                      <div className="col-12 grid-margin">
                        <div className="card">
                          <div className="card-body">
                            <h4 className="card-title">PH Value Pool</h4>
                            <div>
                              {
                                this.state.phWeekData &&
                                <PhLineChartComponent phWeekData={this.state.phWeekData} />
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                }
              </div>
            </div>
            {footerComponent}
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
