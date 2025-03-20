import React, { useState, useEffect } from 'react';
import { FaSearchLocation } from "react-icons/fa";
import axios from 'axios';
import clear from '../asset/clear.png';
import sunny from '../asset/sunny.png';
import rain from '../asset/rain.png';
import thunder from '../asset/thunder.png';
import snow from '../asset/snow.png';
import wind from '../asset/wind.png'
import humidity from '../asset/humidity.png'
import thermo from '../asset/thermo.png'

const Weather = () => {
    const [dateState, setDateState] = useState(new Date());
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState([]);

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    // Weather condition images mapping
    const wImages = {
        Clear: clear,
        Sunny: sunny,
        Rain: rain,
        Thunderstorm: thunder,
        Snow: snow,
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setDateState(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const fetchWeather = async () => {
        if (!city) return;
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=378b83f9282beb305169016618edfcc4&units=metric`
            );
            setWeather(response.data);

            const dayWise = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=378b83f9282beb305169016618edfcc4&units=metric`
            );

            const daily = {};
            dayWise.data.list.forEach((item) => {
                const date = new Date(item.dt * 1000).toLocaleDateString("en-US", {
                    weekday: "long",
                });
                if (!daily[date]) daily[date] = item;
            });

            setForecast(Object.values(daily).slice(0, 6)); // Show next 5 days
        } catch (error) {
            console.error("Error fetching data:", error);
            setWeather(null);
            setForecast([]);
        }
    };

    return (
        <section className='container grid lg:grid-cols-3 lg:gap-0 gap-5   '>
            {/* Clock  */}
            <div className="bg-white/15 mx-auto backdrop-blur-sm w-max h-20 p-4 rounded-lg shadow-lg shadow-slate-500">
                <h1 className="mb-4 md:text-2xl font-extrabold tracking-tight leading-none text-white-900 dark:text-white">
                    {dateState.toLocaleString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        second: "2-digit",
                        hour12: true,
                    })}
                </h1>
            </div>
            {/* Search & Weather Display Section */}
            <div className="bg-white/10 mx-auto backdrop-blur-sm w-max h-max p-6 rounded-lg shadow-lg shadow-slate-800 ">
                <div className="relative">
                    <input
                        type="text"
                        className="text-black text-xl pl-10 pr-2 py-2 rounded-lg border border-gray-300 focus:outline-none"
                        placeholder="Search location..."
                        value={city}
                        onChange={handleCityChange}
                    />
                    <FaSearchLocation
                        className="absolute text-2xl right-2 top-1/2 transform -translate-y-1/2 text-gray-800"
                    />
                </div>

                {weather && (
                    <>
                        <div className='p-6 justify-items-center text-slate-700 text-center'>
                            {/* Weather Icon */}
                            <img
                                src={wImages[weather.weather?.[0]?.main] || clear}
                                className='w-20 mx-auto'
                                alt={weather.weather?.[0]?.main}
                            />
                            <h1 className="text-xl font-bold">{weather.name}</h1>
                        </div>

                        <div className='text-center text-slate-700'>
                            <h1 className="text-2xl font-semibold">{weather.main?.temp}°C</h1>
                        </div>

                        <div className='p-2 text-center text-slate-700'>
                            <h1 className="text-lg capitalize">{weather.weather?.[0]?.description}</h1>
                        </div>

                        <div className='pl-4 pt-2 pb-4 justify-around text-blue-950 text-base flex flex-row gap-10'>
                            <div className='text-center'>
                                <img className='w-6 justify-self-center' src={humidity} alt='huidImage' />
                                <h1>{weather.main.humidity}%</h1>
                                <h2>Humidity</h2>
                            </div>
                            <div className='text-center'>
                                <img className='w-6 justify-self-center' src={wind} alt='windImage' />
                                <h1>{weather.wind.speed} m/s</h1>
                                <h2>Wind</h2>
                            </div>
                            <div className='text-center'>
                                <img className='w-6 justify-self-center' src={thermo} alt='feellike' />
                                <h1>{weather.main.feels_like}°C</h1>
                                <h2>Feels Like</h2>
                            </div>
                        </div>
                    </>
                )}
                {!weather && (
                    <div className="relative w-[200px] h-[250px] pt-12 ml-14 mt-10 flex  justify-center">
                        {/* Front Cloud */}
                        <div className="absolute top-[40px] left-[25px] w-[250px] animate-[clouds_8s_ease-in-out_infinite] z-[11]">
                            <span className="inline-block w-[36px] h-[37px] bg-[#4c9beb] rounded-[50%_50%_0%_50%] z-[5]"></span>
                            <span className="inline-block w-[38px] h-[28px] bg-[#4c9beb] rounded-[50%_50%_50%_0%] z-[5] ml-[-25px]"></span>
                        </div>

                        {/* Sun */}
                        <span className="absolute w-[90px] h-[90px] bg-gradient-to-r from-[#fcbb04] to-[#fffc00] rounded-full"></span>
                        <span className="absolute w-[90px] h-[90px] bg-gradient-to-r from-[#fcbb04] to-[#fffc00] rounded-full animate-[sunshines_2s_infinite]"></span>

                        {/* Back Cloud */}
                        <div className="absolute top-[90px] left-[112px] w-[250px] animate-[clouds_12s_ease-in-out_infinite] z-[12]">
                            <span className="inline-block w-[35px] h-[26px] bg-[#4c9beb] rounded-[50%_50%_0%_50%] z-[5]"></span>
                            <span className="inline-block w-[34px] h-[36px] bg-[#4c9beb] rounded-[50%_50%_50%_0%] z-[5] ml-[-20px]"></span>
                        </div>

                        {/* Custom Animations */}
                        <style>
                            {`
                                @keyframes sunshines {
                                    0% { transform: scale(1); opacity: 0.6; }
                                 100% { transform: scale(1.4); opacity: 0; }
                                 }

                                      @keyframes clouds {
                                       0% { transform: translateX(15px); }
                                         50% { transform: translateX(0px); }
                                     100% { transform: translateX(15px); }
                                        }
                           `}
                        </style>
                        <div className='pt-36 text-lg text-center text-blue-950   '>
                            <p> Please Search a <span className='text-orange-500    '>city......</span></p>
                        </div>
                    </div>
                )}

                {/*  Button */}
                <div className='justify-self-center p-2'>
                    <button
                        onClick={fetchWeather}
                        className="pb-2 relative flex h-[50px] w-40 items-center justify-center overflow-hidden bg-gray-800 text-white shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-orange-600 before:duration-500 before:ease-out hover:shadow-orange-600 hover:before:h-56 hover:before:w-56 rounded-tl-3xl rounded-br-3xl"
                    >
                        <span className="relative z-10 text-lg">Weather Report</span>
                    </button>
                </div>

            </div>


            {/* 5-Day Forecast Section */}
            <div>
                {forecast.length > 0 && (
                    <div className='grid lg:grid-cols-2 grid-cols-3 lg:gap-4 gap-2 items-center  w-max mx-auto  lg:ml-10  '>
                        {forecast.map((day, index) => (
                            <div key={index} className="bg-black/20 p-2 rounded-xl shadow-md text-center  shadow-slate-800 ">
                                <p className="font-bold text-sm">
                                    {new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: "long" })}
                                </p>
                                <img src={wImages[day.weather[0].main] || clear} className="w-[58px] mx-auto " alt="Weather Icon" />
                                <p className="text-sm font-bold mt-1 text-teal-100  ">{day.main.temp.toFixed(1)}°C</p>
                                <p className="text-sm text-white   mt-1 font-bold ">{day.weather[0].description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>

    );
};

export default Weather;