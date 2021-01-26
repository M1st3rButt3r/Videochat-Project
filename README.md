# Videochat Dokumentation
## Ziel des Projekts
Das Ziel des Projektes ist es ein P2P Videochat Tool zu entwickeln, welches ohne jeglichen Speichern von Personenbezogenen Daten auskommt (Serverlog ausgenommen). Dazu wird ein Accountsystem mit anmelden sowie Neuerstellung eines Accounts geschaffen. Diese Accounts sollen sich über ihren Benutzernamen + Tag anfreunden können und so Videotelefonate starten können. Diese sollen über ein Raumsystem funktionieren. Für die Räume bracht man dementsprechend die richtige Berechtigung. Das Raumsystem soll es ermöglichen Später einfacher Gruppen hinzuzufügen, da diese Räume von sich aus mehr Teilnehmer als 2 erlauben. Des Weiteren soll sofern die Zeit bleibt an einer Desktop Version gearbeitet werden, und ein P2P Chat Tool erstellt werden.

## Tagebuch
### 19.01.21
Ich habe den Fehler des letzten Males, das die Socket.io Connection nicht funktioniert behoben, der Fehler lag darin, dass ich Client Seitig nicht die Socket.io Library eingebunden hatte, was nötig für das Funktionieren der Verbindung ist.

```javascript
+ <script src="/socket.io/socket.io.js"></script>
```
