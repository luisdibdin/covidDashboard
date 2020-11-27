const accessToken = 'pk.eyJ1IjoibHVpc2RpYmRpbiIsImEiOiJja2h6a3V1aHYwYnA1MnJxazBiZmFudnpxIn0.k4QB7Dw4ny_be7qvf9pt8A'
export const mapServices = [
  {
    name: "OpenStreetMap",
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  },
  {
    name: "Mapbox",
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    url: `https://api.mapbox.com/styles/v1/luisdibdin/ckhzkynqp019x19qml4r08dz7/tiles/256/{z}/{x}/{y}@2x?access_token=${accessToken}`,
  },
];
