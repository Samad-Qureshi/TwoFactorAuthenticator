import { TouchableOpacity,Image} from 'react-native';
import {
    responsiveScreenHeight,
    responsiveScreenWidth,
    responsiveScreenFontSize,
    responsiveFontSize
} from "react-native-responsive-dimensions";

const ToggleButton = ({ icon,handler}) => {
    return (
        <TouchableOpacity style={{ width: responsiveScreenWidth(10), height: responsiveScreenHeight(5), justifyContent: 'center', alignItems: 'center' }}
            onPress={handler}>
            <Image source={icon} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
    )
}

export default ToggleButton;