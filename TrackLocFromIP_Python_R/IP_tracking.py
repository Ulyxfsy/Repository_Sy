#IP TRACKING USING API : ip-api geolocation

import requests #get request http python library

## ping ip response
#using geolocation APi pathway JSON
ip_ping = requests.get("http://ip-api.com/json/")
#print(ip_ping)#self pinging


ip_info = requests.get("http://ip-api.com/json/apple.com").json() #to extract python dic from APi JSON file
#INSERT IP ADDRRESS after json/


###SINGLE IP TRACING
"""
#printing from JSON file thats provided by the API
print("Country: ", ip_info['country'],"\nRegion: ", ip_info['regionName'],
      "\nCity: ", ip_info['city'], "\nZip: ", ip_info['zip'],
      "\nLatitude: ", ip_info['lat'], "\nLogitude: ", ip_info['lon'])
"""

###MULTIPLE IP TRACING
ip_ping = requests.post("http://ip-api.com/batch", json=[
    #INSERT IP ADDRESS (SAMPLE: 0.0.0.0") IN " "
    {"query": "217.138.201.92"}, #singapore
    {"query": "217.146.82.84"}, #uk
    {"query": "92.119.177.20"} #us
]).json()

#Please Beware of positions of code
#looping prog to display ip details
for ip_info in ip_ping:
    print("Country: ", ip_info['country'],"\nRegion: ", ip_info['regionName'],
      "\nCity: ", ip_info['city'], "\nZip: ", ip_info['zip'],
      "\nLatitude: ", ip_info['lat'], "\nLogitude: ", ip_info['lon'])
    print("\n")
