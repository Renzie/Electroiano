#include <ESP8266WiFi.h>
#include <PubSubClient.h>

const char* ssid = "Van Besien";
const char* password = "9C7F7ED525"; //paswoord thuis = 9C7F7ED525
const char* mqtt_server = "192.168.1.3"; //ip adres van pc

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  Serial.begin(115200);
  pinMode(BUILTIN_LED, OUTPUT);  //Builtin led van nodemcu
  setup_wifi();
  client.setServer(mqtt_server, 1883);

  
  client.setCallback(playNote);
}

void loop() {
  if (!client.connected()) reconnect();
  client.loop();
}

void setup_wifi() {
  delay(10);
  Serial.println("Connecting to WiFi");
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  randomSeed(micros());

  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}


String getString(byte* payload, unsigned int length) {
  String tmp = "";
  for (int i = 0; i < length; i++)  tmp += (char)payload[i];
  return tmp;
}


void playNote(char* topic, byte* payload, unsigned int length) {
  Serial.println(getString(payload, length));

  if (getString(payload, length).toInt() == 1 ){
      noTone(D8);
  } else {
     tone(D8, getString(payload, length).toInt());
  }
}

void connectionSuccessSong(){
  int notes[] = {554,698,830, 1108};
  for (int i = 0; i < sizeof(notes) - 1; i++){
    tone(D8, notes[i]);
    delay(200);
  }
  noTone(D8);
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.println("Connecting to mqtt server...");
    // Create a random client ID
    String clientId = "ESP8266";
    clientId += String(random(0xffff), HEX);
    if (client.connect(clientId.c_str())) { //when connected to mqtt
      client.subscribe("key"); //subscribe to key
      Serial.println("Connected to mqtt server!");
      //connectionSuccessSong(); zorgt voor disconnection :(
    } 
    else {
      Serial.print("connection failed.");
      Serial.print(client.state());
      Serial.println("reconnecting in 5 seconds");
      delay(5000);
    }
  }
}




