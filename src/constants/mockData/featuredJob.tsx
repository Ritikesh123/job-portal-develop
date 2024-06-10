import { ReactComponent as AxisLogo } from "@/assets/img/icons/Axis.svg";
import { ReactComponent as SbiLogo } from "@/assets/img/icons/SBI.svg";
import { ReactComponent as KotakLogo } from "@/assets/img/icons/Kotak.svg";
import { ReactComponent as HdfcLogo } from "@/assets/img/icons/Hdfc.svg";

const DEFAULT_FEATURED_JOBS = [
  {
    id: 1,
    title: "Bank Manager",
    icon: <AxisLogo className="h-11 w-11" />,
    route: "",
    properties: ["Remote", "Axis Bank", "Mumbai"],
  },
  {
    id: 2,
    title: "Bank Manager",
    icon: <HdfcLogo className="h-11 w-11" />,
    route: "",
    properties: ["Full-time", "HDFC Bank", "Mumbai"],
  },
  {
    id: 3,
    title: "Bank Manager",
    icon: <SbiLogo className="h-11 w-11" />,
    route: "",
    properties: ["Remote", "SBI", "Mumbai"],
  },
  {
    id: 4,
    title: "Bank Manager",
    icon: <KotakLogo className="h-11 w-11" />,
    route: "",
    properties: ["Part-time", "Kotak Bank", "Mumbai"],
  },
];

export default DEFAULT_FEATURED_JOBS;
