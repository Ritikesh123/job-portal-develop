import User from "@/components/Icons/User";
import { ReactComponent as Users } from "@/assets/img/icons/users.svg";
import { ReactComponent as Languages } from "@/assets/img/icons/languages.svg";
import { ReactComponent as Resume } from "@/assets/img/icons/resume.svg";
import { ReactComponent as Employer } from "@/assets/img/icons/employer.svg";
import { ReactComponent as User2 } from "@/assets/img/icons/user.svg";

export default [
  {
    title: "Register",
    icon: <User />,
    route: "/login",
  },
  {
    title: "Login",
    icon: <User2 width={26} height={26} />,
    route: "/login",
  },
  {
    title: "Employer Login",
    icon: <Employer width={26} height={26} />,
    route: import.meta.env.VITE_EMPLOYER_LOGIN_URL as string,
    externalRedirect: true,
  },
  // {
  //   title: "AI Resume Builder",
  //   icon: <Resume width={26} height={26} />,
  //   route: "/upload-resume",
  // },
  {
    title: "Community",
    icon: <Users width={26} height={26} />,
    route: import.meta.env.VITE_BLOG_URL as string,
    externalRedirect: true,
  },
  // {
  //   title: "Language",
  //   icon: <Languages width={26} height={26} />,
  //   route: "",
  // },
];
