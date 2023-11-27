#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include "Senha.h"

void setup() {

  pinMode(D0, INPUT);
  pinMode(D1, INPUT);
  pinMode(D2, INPUT);
  pinMode(D4, INPUT);

  Serial.begin(115200);

  Serial.println();
  Serial.println();
  Serial.println();

  WiFi.begin(STASSID, STAPSK);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Conectado! IP: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  String placa, entrada;
  if (digitalRead(D0)) {
    placa = "ABC1234";
    entrada = "1";
  } else if (digitalRead(D1)) {
    placa = "ABC1234";
    entrada = "0";
  } else if (digitalRead(D2)) {
    placa = "DEF5678";
    entrada = "1";
  } else if (digitalRead(D4)) {
    placa = "DEF5678";
    entrada = "0";
  } else {
    return;
  }

  // wait for WiFi connection
  if ((WiFi.status() == WL_CONNECTED)) {

    WiFiClient client;
    HTTPClient http;

    Serial.print("Enviando: ");
    Serial.print(placa);
    Serial.print(" / ");
    Serial.println(entrada);

    Serial.print("[HTTP] Conectando...\n");
    // configure traged server and url
    http.begin(client, "http://" SERVER_IP "/criarLog/");  // HTTP
    http.addHeader("Content-Type", "application/json");

    Serial.print("[HTTP] POST...\n");
    String json = "{\"placa\":\"";
    json += placa;
    json += "\",\"entrada\":";
    json += entrada;
    json += "}";
    // start connection and send HTTP header and body
    int httpCode = http.POST(json);

    // httpCode will be negative on error
    if (httpCode > 0) {
      // HTTP header has been send and Server response header has been handled
      Serial.printf("[HTTP] POST... code: %d\n", httpCode);

      // file found at server
      if (httpCode == HTTP_CODE_OK) {
        const String& payload = http.getString();
        Serial.println("Dados recebidos:\n<<");
        Serial.println(payload);
        Serial.println(">>");
      }
    } else {
      Serial.printf("[HTTP] POST... Erro: %s\n", http.errorToString(httpCode).c_str());
    }

    http.end();
  }

  delay(2000);
}
