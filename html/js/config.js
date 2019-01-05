var config = {
    lang: "zh-cn",
    time: {
        timeFormat: 24
    },
    weather: {
        interval: 600000,
        fadeInterval: 10000,
        params: {
            // cityid: "",
            location:"衡阳",
            key: "98248b3cf3e149c88c01754a617ebf2b"
        }
    },
  //   tem_hum: {
  //       mqttServer:"localhost",
		// mqttServerPort:9001,
		// mqttclientName:"magic_mirror_tem_hum",
		// temperatureTopic:"/DHT"
  //   },
    compliments: {
        interval: 30000,
        fadeInterval: 4000,
        morning: [
            'Good morning, handsome!',
            'Enjoy your day!',
            'How was your sleep?'
        ],
        afternoon: [
            'Hello, beauty!',
            'You look sexy!',
            'Looking good today!'
        ],
        evening: [
            'Wow, you look 哈!',
            'You look nice!',
            'Hi, sexy!'
        ]
    },
    calendar: {
        maximumEntries: 10,
        url: "https://outlook.live.com/owa//calendar/00000000-0000-0000-0000-000000000000/151e6817-edc0-4815-ad66-eb3b5735a235/cid-5500D50AB2339570/calendar.ics"
    },
    news: {
        feed: 'http://feed.williamlong.info/'
    },

    modules:[
            {
                module:"MMM-Tools",
                position: 'bottom_right',
                config: {
                    device : "ATB", // "RPI" is also available
                    refresh_interval_ms : 10000,
                    warning_interval_ms : 1000 * 60 * 5,
                    enable_warning : true,
                    warning : {
                    CPU_TEMPERATURE : 65,
                    GPU_TEMPERATURE : 65,
                    CPU_USAGE : 75,
                    STORAGE_USED_PERCENT : 80,
                    MEMORY_USED_PERCENT : 80
                    }
                }

            }
        ]
}

/*************** DO NOT EDIT THE LINE BELOW ***************/

if (typeof module !== "undefined") {module.exports = config;}