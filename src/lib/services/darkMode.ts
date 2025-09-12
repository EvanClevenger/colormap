import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const accessToken = import.meta.env.JAWG_ACCESS_TOKEN;

const style = 'jawg-dark';

let map: L.Map | undefined;

export default function DarkModeToggle() {
	//prevents re-init if map exsists already
	if (map) return;

	map = L.map('map');

	const darkMode = L.tileLayer(`https://tile.jawg.io/${style}/{z}/{x}/{y}.png?access-token=${accessToken}`, {
		attribution:
			'<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank" class="jawg-attrib">&copy; <b>Jawg</b>Maps</a> | <a href="https://www.openstreetmap.org/copyright" title="OpenStreetMap is open data licensed under ODbL" target="_blank" class="osm-attrib">&copy; OpenStreetMap</a>'
	});
	darkMode.addTo(map);
}
