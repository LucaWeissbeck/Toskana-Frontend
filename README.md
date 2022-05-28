# IoT Home Dashboard - Holiday Home

### Use Case


#### PH Value 
This project emerged from the necessity to have the option to **monitor the holiday home** in Tuscany, Italy remotely. Usually there is little supervision of a
holiday home during periods of absence which is why it is a good idea to have monitor capabilites in place. Especially for longer periods of time. One of the
most importants apsect of this project was the ability to monitor the **PH-Value of the outdoor pool**. The PH-Value is an indicator for whether or not the pool water 
is going bad and is therefore able to act as an early warning. Once the pool water has turned bad it is incredibly more difficult to return 
the water into its original clear state in comparison to being warned remotely at an earlier point in time so that people on site can be notified of the issue
and deal with it accordingly. 

#### Security
Security cameras are gaining more and more popularity as the price and ease of use has significantly reduced over the past years. The ability to supervise and be notified of
any actions happening at the remote property is key in **preventing crime** and creating a sense of **security**. For this category a security camera needs to be chosen from a manufacturer 
that is offering a public API.

#### Temperature
Being able to know the temperature may seem more like a gimmick but is extremely useful for the use case of a holiday home as it provides the comfort
of knowing of any **problems regarding the  heating system** previous to the arrival so it can be dealt with.
There are a wide range of temperature sensors available on the market. It is important that the sensor can communicate with a public API.

### Chosen Products
- Netatmo Smart Home Weather Station (Indoor & Outdoor Module) -> <a href="https://www.netatmo.com/en-eu/weather/weatherstation">Learn more<a>
- Netatmo Smart Indoor Camera -> <a href="https://www.netatmo.com/en-eu/security/cam-indoor">Learn more<a>
- Raspberry Pi 3 B+ - 3.5" (8,9 cm) Touch Display Set -> <a href="https://www.reichelt.com/ch/en/raspberry-pi-3-3-5-8-9-cm-touchscreen-display-set-rpi-set-3-5-3b--p239418.html?&trstct=pos_1&nbc=1">Learn more</a>
- Elegoo Uno R3 Microcontroller (Arduino replica) -> <a href="https://www.amazon.de/-/en/gp/product/B01EWOE0UU/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&psc=1">Learn more</a>
  
### Roadmap
- [x] Create Basic Dashboard
- [x] Create API able to communicate with SmartHome Products
- [x] Make integrated SmartHome products adaptble to users preference
- [x] Purchase PH sensor & Arduino
- [x] Program Python scripts for Raspberry Pi to send receive PH data from Arduino and send it to DB twice a day
- [x] Establish Login System with MongoDB and Passport.js
- [x] Prevent User from accessing empty dashboard when not logged in (Bug)
- [ ] Create preview screenshots for GitHub
- [ ] Be able to send invitation E-Mails using Auth0 (currently user needs to be configured manually)
- [ ] Change storage location of PH-Value logs to MongoDB 
- [ ] Improve robustness of python scripts on Raspberry Pi
- [x] Configure outdoor camera 
- [ ] Manage PH chart if no data is provided
- [x] Configure LTE modem for Raspberry Pi
- [ ] Make PH sensor send data wirelessly
  
  

