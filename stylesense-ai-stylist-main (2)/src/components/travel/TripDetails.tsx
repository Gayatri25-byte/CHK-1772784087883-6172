import { motion } from "framer-motion";
import { Plane, MapPin, Calendar, CloudSun } from "lucide-react";

const tripInfo = [
  { icon: MapPin, label: "Destination", value: "Paris, France" },
  { icon: Calendar, label: "Duration", value: "4 nights" },
  { icon: CloudSun, label: "Weather", value: "15°C, Partly Cloudy" },
  { icon: Plane, label: "Events", value: "Meeting + Dinner" },
];

const TripDetails = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="max-w-4xl mx-auto glass-card p-6 mb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tripInfo.map(({ icon: Icon, label, value }) => (
          <div key={label} className="text-center p-3">
            <Icon size={20} className="text-accent mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="text-sm font-semibold text-foreground">{value}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default TripDetails;
