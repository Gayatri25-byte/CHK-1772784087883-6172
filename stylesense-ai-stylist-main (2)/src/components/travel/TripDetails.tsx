import { useTripStore } from "@/lib/tripStore";
import { motion } from "framer-motion";
import { Plane, MapPin, Calendar, CloudSun } from "lucide-react";
import { useState } from "react";

const TripDetails = () => {

const { destination, duration, weather, events, setTrip } = useTripStore();

 return (
<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.1 }}
className="max-w-4xl mx-auto glass-card p-6 mb-8"
>

<div className="grid grid-cols-2 md:grid-cols-4 gap-4">

<motion.button
whileHover={{scale:1.05}}
whileTap={{scale:0.95}}
onClick={()=>{
const value = prompt("Enter Destination");
if(value)setTrip({ destination: value });
}}
className="text-center p-4 glass-card"
>
<MapPin size={20} className="text-accent mx-auto mb-2"/>
<p className="text-xs text-muted-foreground">Destination</p>
<p className="text-sm font-semibold">{destination || "Click to add"}</p>
</motion.button>


<motion.button
whileHover={{scale:1.05}}
whileTap={{scale:0.95}}
onClick={()=>{
const value = prompt("Enter Trip Duration");
if(value) setTrip({ duration: value });
}}
className="text-center p-4 glass-card"
>
<Calendar size={20} className="text-accent mx-auto mb-2"/>
<p className="text-xs text-muted-foreground">Duration</p>
<p className="text-sm font-semibold">{duration || "Click to add"}</p>
</motion.button>


<motion.button
whileHover={{scale:1.05}}
whileTap={{scale:0.95}}
onClick={()=>{
const value = prompt("Enter Weather");
if(value) setTrip({ weather: value });
}}
className="text-center p-4 glass-card"
>
<CloudSun size={20} className="text-accent mx-auto mb-2"/>
<p className="text-xs text-muted-foreground">Weather</p>
<p className="text-sm font-semibold">{weather || "Click to add"}</p>
</motion.button>


<motion.button
whileHover={{scale:1.05}}
whileTap={{scale:0.95}}
onClick={()=>{
const value = prompt("Enter Events");
if(value) setTrip({ events: value });
}}
className="text-center p-4 glass-card"
>
<Plane size={20} className="text-accent mx-auto mb-2"/>
<p className="text-xs text-muted-foreground">Events</p>
<p className="text-sm font-semibold">{events || "Click to add"}</p>
</motion.button>

</div>

</motion.div>
);
};

export default TripDetails;
