import {Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js';
import CryptoES from 'crypto-es';
// import { fetch } from 'react-native-ssl-pinning';
// export const baseURL = 'https://sun-dosecalculator.bdccoder.in/api/v1';
// export const baseURL = 'https://dev.dermadosecalculator.sunkonnect.in/api/v1';
export const baseURL = 'https://dermadosecalculator.sunkonnect.in/api/v1';

// https://dermadosecalculator.sunkonnect.in/
export const AppVersion = '1.0.0';
export const device = Platform.OS;
export const ApiKey = 'tr$ffC>^dfd!w*-6WUJCmV>Wb=rxA^f8w+J:a&DP]qS@ss';

export const fetchResource = async (resource, isLoggedin = true) => {
  const {url, body} = resource;
  // const encrypt = JSON.parse(CryptoJSAesEncrypt(body));

  // console.log('resource data  -->', body);
  const token = JSON.parse(await AsyncStorage.getItem('@token'));
  const headers = isLoggedin
    ? {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        Authorization: `Bearer  ${token}`,
        ApiKey,
      }
    : {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        ApiKey,
      };
  try {
    const response = await fetch(`${baseURL}/${url}`, {
      method: 'POST',
      headers,
      body,
      sslPinning: {
        certs: ['mycert'],
      },
    });
    const apiResponse = await response.json();

    const decryptedResponse = JSON.parse(CryptoJSAesDecrypt(apiResponse));
    // console.log('decryptedRespon/se-   ----->', decryptedResponse);

    // const decryptedResponse = CryptoJSAesDecrypt(JSON.parse(apiResponse));

    return decryptedResponse;
  } catch (err) {
    console.log(`Error: ${err}`);
    return err;
  }
};
function CryptoJSAesDecrypt(encrypted_json_string) {
  var obj_json = JSON.parse(encrypted_json_string);

  var encrypted = obj_json.output;
  var salt = CryptoJS.enc.Hex.parse(obj_json.salt);
  var iv = CryptoJS.enc.Hex.parse(obj_json.iv);

  var key = CryptoJS.PBKDF2('F-J@NcRfUjXn2r5u8x/A?D(G+KbPdSgV', salt, {
    hasher: CryptoJS.algo.SHA512,
    keySize: 64 / 8,
    iterations: 999,
  });

  var decrypted = CryptoJS.AES.decrypt(encrypted, key, {iv: iv});

  return decrypted.toString(CryptoJS.enc.Utf8);
}

export function CryptoJSAesEncrypt(encrypted_json_string) {
  var salt = CryptoJS.enc.Hex.parse(
    'be438f3342ca7d8402cba6c80b9ebc6520a7befc3c23ae772bab0e4b27cf94eda157ce2bbf3cbd90df451e29cc8f59a6a34145914de8cb09ed89549d7b7bf0960c54c9221000be8aeed58619b6368b75bbea943edb8aa68b7d47068af6288873a4f1ca226daea22494b0de46d74c2e58653252962d3677cd58f6c8b8630349523bc7e02cc2b4678a60e9a8a5fa2e5f880b5c2bd8cc4d8973a54f8ded7cc7abee09b25812042a9469bb09c53fd17849eda07a59c05178fd230f9386a8293ec5f18c6d6425096ada743d4c919cfb6fa2585e0e1409920d159b03c19b6602c095cd71e64c1941df9d276a6a590fd337f333087275e8dc3d6ed08dbc03360bc7f26d',
  );
  var iv = CryptoJS.enc.Hex.parse('8b6e56c01ee1f5bf303c569dbe7191e5');
  var key = CryptoJS.PBKDF2('F-J@NcRfUjXn2r5u8x/A?D(G+KbPdSgV', salt, {
    hasher: CryptoJS.algo.SHA512,
    keySize: 64 / 8,
    iterations: 999,
  });

  var decrypted = CryptoJS.AES.encrypt(encrypted_json_string, key, {iv: iv});
  // let decryptedString = decrypted.toString();
  return decrypted.toString();
}

export const CheckInternet = () => {
  NetInfo.fetch().then(state => {
    if (state.isConnected == false) {
      let isConnected = false;
      return state;
    } else {
      let isConnected = true;
      return state;
    }
  });
};
