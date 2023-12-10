import React, { useState } from 'react';
import './WeatherApp.css';

import search_icon from '../Assets/magnifying-glass (1).png'
import hujan from '../Assets/hujan.png'
import hujanringan from '../Assets/hujan-ringan.png'
import lembap from '../Assets/lembap.png'
import angin from '../Assets/wind.png'
import hujansalju from '../Assets/snowy.png'
import berawan from '../Assets/berawan.png'
import terik from '../Assets/terik.png'

export const WeatherApp = () => {

    let api_key = "d4282c9297aed2fcc5f47db487bad62e";

    const [wIcon, setwIcon] = useState(berawan);

    //Membuat Fungsi untuk search box
    const search = async () => {
        const element = document.getElementsByClassName("input-kota")
        if(element[0].value==="") // ketika search box tidak terisi
        {
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`

        let response = await fetch(url);
        let data = await response.json();  

        const kelembapan = document.getElementsByClassName("tingkat-kelembapan");
        const angin = document.getElementsByClassName("kecepatan-angin");
        const temperatur = document.getElementsByClassName("temperatur");
        const lokasi = document.getElementsByClassName("lokasi");

        kelembapan[0].innerHTML = data.main.humidity + " %";
        angin[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
        temperatur[0].innerHTML = Math.floor(data.main.temp) + "°c";
        lokasi[0].innerHTML = data.name + ", " + data.sys.country;

        if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n" )
        {
            setwIcon(berawan);
        }
        else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n")
        {
            setwIcon(berawan);
        }
        else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n")
        {
            setwIcon(hujanringan);
        }
        else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n")
        {
            setwIcon(hujan);
        }
        else if(data.weather[0].icon==="11d" || data.weather[0].icon==="11n")
        {
            setwIcon(hujan);
        }
        else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n")
        {
            setwIcon(hujansalju);
        }
        else {
            setwIcon(terik)
        }
        
        
    }

  return (
        <div className='container'>
            <div className="top-bar">
                <input type="text" className="input-kota" placeholder='Masukkan nama Kota' />
                <div className="search-icon" onClick={() => search()}>
                <img className='search' src={search_icon} alt="" />
                </div>
            </div>
            <div className="weather-image">
                <img src={wIcon} alt="" />
            </div>
            <div className="temperatur">24°c</div>
            <div className="lokasi">Bekasi</div>
            <div className="data-container">
                <div className="element">
                    <img src={lembap} alt="" className="icon" />
                    <div className="data">
                        <div className="text">Kelembapan</div>
                        <div className="tingkat-kelembapan">64%</div>
                    </div>
                </div>
                <div className="element">
                    <img src={angin} alt="" className="icon" />
                    <div className="data">
                        <div className="text">Kecepatan Angin</div>
                        <div className="kecepatan-angin">18 km/h</div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default WeatherApp