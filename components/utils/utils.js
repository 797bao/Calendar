import { Alert } from "react-native";

export function handlePostAjaxResponse(res) {
  if (res.error != "") {
    console.log(res);
    console.log(res.erorr);
    return Alert.alert("Error!", res.error, [{ text: "OK" }]);
  }

  if (res.success != "") {
    return Alert.alert("Success!", res.success, [{ text: "OK" }]);
  }
}
