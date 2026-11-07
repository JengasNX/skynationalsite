---
title: "Essential software: client, plugins and charts"
category: software
order: 1
excerpt: "The minimal startup kit: network client, simulator bridges, charts, flight planner and network settings."
---

A full online-flying software stack can easily eat half a day of installing. Let us assemble the minimal working kit and explain what each part is for.

## The network client

A network client (vPilot, xPilot and similar) is the core program: it transmits your data to the network, draws other traffic and handles both text and voice communication. Callsign, aircraft type and connection mode are all configured inside it. Install the client from the official network resource and make sure it "sees" your simulator before the flight starts.

## Simulator compatibility plugins

Some simulators and clients talk to each other through intermediate layers:

- **SimConnect** — the built-in interface of Microsoft Flight Simulator and a number of related platforms;
- **FSUIPC** — the classic bridge for older simulators and external utilities;
- similar bridges are used wherever the client needs access to instruments and aircraft state.

Install only what your "simulator + client" combination actually requires. Redundant plugins are a frequent source of conflicts and crashes.

## Charts and navigation

- **Navigraph** — up-to-date aeronautical charts and navigation data, it covers the whole need.
- **Open-source airport charts** — free field diagrams: taxi, arrival and departure charts. They are enough to start.
- The simulator's built-in map or the map inside the client — for situational awareness along the track.

Keep at least the departure airport's taxi chart and the arrival airport's approach chart open at all times.

## Flight planners

A planner (SimBrief and similar) builds the route, calculates the fuel and produces a flight plan in a format the networks accept. Weight calculators and ICAO-format charts come in handy next to it. Take the generated plan first, then check it against the weather — the planner knows nothing about your mood or how much time you have today.

## Voice and text: Discord

The community **Discord** exists not for the flight itself but for the life around it: announcements, events, flight debriefs, quick questions. Network voice goes through the network client, so never patch the Discord server into your radio frequency or broadcast channel chatter into the network.

## Network hiccups and the minimal start rule

If the connection keeps dropping, check in order: firewall and antivirus (allow the network client through), VPN and proxies, unstable Wi-Fi, a backup connection via a mobile hotspot. The port that blocks one client may be free for another.

**Tip:** install the minimum — network client, simulator bridge, charts, planner. Everything else can be added once you genuinely need it.
