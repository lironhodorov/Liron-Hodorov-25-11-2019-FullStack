using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WeatherLiron.Models
{
    public class CurrentWeather
    {
        public string WeatherText { get; set; }

        public Temperature temperature { get; set; }
    }
    public class Temperature
    {
        public Metric metric { get; set; }
    }
    public class Metric
    {
        public double Value { get; set; }
    }
}