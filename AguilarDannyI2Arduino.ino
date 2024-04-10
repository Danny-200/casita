#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <addons/TokenHelper.h>
#include <addons/RTDBHelper.h>
#include <ArduinoJson.h>

const char* WIFI_SSID = "a";
const char* WIFI_PASSWORD = "12345678";
const char* API_KEY = "AIzaSyAcZ52x46-9RF4a5LFP0Yz_7ECMJAticIM";
const char* DATABASE_URL = "https://lecturad-3d871-default-rtdb.firebaseio.com/"; //<databaseName>.firebaseio.com or <databaseName>.<region>.firebasedatabase.app;
const char* USER_EMAIL = "pablo@danny.com";
const char* USER_PASSWORD = "dannyamapablo";

// Objeto para manejar la comunicación con Firebase
FirebaseData fbdo;

// Objeto para la autenticación en Firebase
FirebaseAuth auth;

// Objeto de configuración de Firebase
FirebaseConfig config;

// Tiempo desde el último envío de datos a Firebase
unsigned long sendDataPrevMillis = 0;

// Contador para el estado del botón
unsigned long count = 0;

// Pin del botón físico
const int BUTTON = 15;

// Almacena el estado actual del botón
int buttonState = 0;
void setup() {
 Serial.begin(115200);
    setup_WIFI();
    setupFirebase();
    pinMode(23, INPUT);//COnfiguracion del Pin 15 como entrada
        pinMode(22, INPUT);//COnfiguracion del Pin 15 como entrada

    pinMode(21, INPUT);//COnfiguracion del Pin 15 como entrada

    pinMode(19, INPUT);//COnfiguracion del Pin 15 como entrada

    pinMode(18, INPUT);//COnfiguracion del Pin 15 como entrada

    pinMode(5, INPUT);//COnfiguracion del Pin 15 como entrada

}

void loop() {
 // Verifica si Firebase está listo y si ha pasado cierto tiempo desde el último envío de datos
  if (Firebase.ready() && (millis() - sendDataPrevMillis > 15000 || sendDataPrevMillis == 0))
  {
      // Lee el estado del botón
      buttonState = digitalRead(23);
      Serial.println("1: "+buttonState);
      
      // Envía el estado del botón a la base de datos en tiempo real de Firebase
      if (Firebase.RTDB.setInt(&fbdo, F("/cocina"), buttonState)) {
          Serial.println("Data sent successfully.");
      } else {
          Serial.print("Failed to send data: ");
          Serial.println(fbdo.errorReason().c_str());
      }

      buttonState = digitalRead(22);
            Serial.println("2: "+buttonState);

      // Envía el estado del botón a la base de datos en tiempo real de Firebase
      if (Firebase.RTDB.setInt(&fbdo, F("/habitacionLisa"), buttonState)) {
          Serial.println("Data sent successfully.");
      } else {
          Serial.print("Failed to send data: ");
          Serial.println(fbdo.errorReason().c_str());
      }

      buttonState = digitalRead(21);
            Serial.println("3: "+buttonState);

      // Envía el estado del botón a la base de datos en tiempo real de Firebase
      if (Firebase.RTDB.setInt(&fbdo, F("/habitacionBart"), buttonState)) {
          Serial.println("Data sent successfully.");
      } else {
          Serial.print("Failed to send data: ");
          Serial.println(fbdo.errorReason().c_str());
      }

      buttonState = digitalRead(19);
            Serial.println("4: "+buttonState);

      // Envía el estado del botón a la base de datos en tiempo real de Firebase
      if (Firebase.RTDB.setInt(&fbdo, F("/entrada"), buttonState)) {
          Serial.println("Data sent successfully.");
      } else {
          Serial.print("Failed to send data: ");
          Serial.println(fbdo.errorReason().c_str());
      }

      buttonState = digitalRead(18);
            Serial.println("5: "+buttonState);

      // Envía el estado del botón a la base de datos en tiempo real de Firebase
      if (Firebase.RTDB.setInt(&fbdo, F("/garaje"), buttonState)) {
          Serial.println("Data sent successfully.");
      } else {
          Serial.print("Failed to send data: ");
          Serial.println(fbdo.errorReason().c_str());
      }

      buttonState = digitalRead(5);
            Serial.println("6: "+buttonState);

      // Envía el estado del botón a la base de datos en tiempo real de Firebase
      if (Firebase.RTDB.setInt(&fbdo, F("/sala"), buttonState)) {
          Serial.println("Data sent successfully.");
      } else {
          Serial.print("Failed to send data: ");
          Serial.println(fbdo.errorReason().c_str());
      }
  }
}

void setup_WIFI(){
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  unsigned long ms = millis();
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();
}

void setupFirebase() {
  config.api_key = API_KEY;
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;
  config.database_url = DATABASE_URL;
  config.token_status_callback = tokenStatusCallback;
  config.signer.tokens.legacy_token = "<database secret>";
  Firebase.reconnectNetwork(true);
  fbdo.setBSSLBufferSize(4096, 1024);
  fbdo.setResponseSize(2048);
  Firebase.begin(&config, &auth);
  Firebase.setDoubleDigits(5);
  config.timeout.serverResponse = 10 * 1000;
  Serial.printf("Firebase Client v%s\n\n", FIREBASE_CLIENT_VERSION);
}
