import * as Images from "../Assets";

const selectImage = (imageName: string) => {
	switch (imageName) {
		case "Donlon":
			return Images.Donlon;
		case "Enchai":
			return Images.Enchai;
		case "Jebing":
			return Images.Jebing;
		case "Lerbin":
			return Images.Lerbin;
		case "Pingasor":
			return Images.Pingasor;
		case "Sapir":
			return Images.Sapir;
		case "Space pod":
			return Images.Pod;
		case "Space rocket":
			return Images.Rocket;
		case "Space ship":
			return Images.Ship;
		case "Space shuttle":
			return Images.Shuttle;
	}
};

export default selectImage;
