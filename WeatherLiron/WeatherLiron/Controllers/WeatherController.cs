using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using WeatherLiron.Models;

namespace WeatherLiron.Controllers
{
    public class WeatherController : ApiController
    {

        private readonly string apiKey = "sJPlDzPqRwuq91OCMMvb3dsdWtgGnuGy";
        private readonly string baseUrl = "http://dataservice.accuweather.com/";
        string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["weatherConnectionString"].ToString();

        [HttpGet]
        public async Task<List<AutoCompleteResponse>> AutoComplete(string q)
        {
            string content = "";
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(baseUrl);

            HttpResponseMessage response = client.GetAsync(baseUrl + "locations/v1/cities/autocomplete?apikey=" + apiKey + "&q=" + q).Result;
            if (response.IsSuccessStatusCode)
            {
                content = await response.Content.ReadAsStringAsync();
            }

            var res = JsonConvert.DeserializeObject<List<AutoCompleteResponse>>(content);

            return res;
        }

        [HttpPost]
        public async Task<CurrentWeatherResponse> GetCurrentWeather(GetCurrentWeatherRequest request)
        {
            CurrentWeatherResponse result = null;
            string content = "";
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(baseUrl);
            WeatherDbDataContext db = new WeatherDbDataContext(connectString);

            //Create new Employee

            weather weather = db.weathers.FirstOrDefault(x => x.key == request.Key);
            if (weather != null)
            {
                return new CurrentWeatherResponse { text = weather.WeatherText, value = double.Parse(weather.celsius) };
            }
            else
            {
                HttpResponseMessage response = client.GetAsync(baseUrl + "currentconditions/v1/" + request.Key + "?apikey=" + apiKey).Result;
                if (response.IsSuccessStatusCode)
                {
                    content = await response.Content.ReadAsStringAsync();
                    var list = JsonConvert.DeserializeObject<List<CurrentWeather>>(content);
                    if (list.Count > 0)
                    {
                        result = new CurrentWeatherResponse { text = list[0].WeatherText, value = list[0].temperature.metric.Value };
                        db.weathers.InsertOnSubmit(new weather { celsius = result.value.ToString(), key = request.Key, WeatherText = result.text });
                        db.SubmitChanges();
                    }
                }
            }
            return result;
        }

        [HttpGet]
        public List<Favorite> GetFavorites()
        {
            WeatherDbDataContext db = new WeatherDbDataContext(connectString);
            var result = db.favorites.Select(x => new Favorite { Key = x.key, name = x.name }).ToList();

            return result;

        }

        [HttpPost]
        public void AddToFavorites(AddFavoriteRequest request)
        {

            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["weatherConnectionString"].ToString();

            WeatherDbDataContext db = new WeatherDbDataContext(connectString);

            //Create new Employee

            favorite fav = new favorite();
            fav.key = request.key;
            fav.name = request.name;

            //Add new Employee to database
            db.favorites.InsertOnSubmit(fav);

            //Save changes to Database.
            db.SubmitChanges();
        }

        [HttpPost]
        public void RemoveFromFavorites(RemoveFavoriteRequest request)
        {
            WeatherDbDataContext db = new WeatherDbDataContext(connectString);

            //Create new Employee

            favorite fav = db.favorites.FirstOrDefault(x => x.key == request.key);

            //Add new Employee to database
            db.favorites.DeleteOnSubmit(fav);

            //Save changes to Database.
            db.SubmitChanges();
        }
    }
}
