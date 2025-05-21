import {
  CalendarIcon,
  CurrencyDollarIcon,
  LayoutDashboardIcon,
  UserCircleIcon,
  TicketIcon,
} from "vue-tabler-icons";
export interface menu {
  header?: string;
  title?: string;
  icon?: any;
  to?: string;
  chip?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
  external?: boolean;
}

const sidebarItem: menu[] = [
  { header: "HR Admin" },
  {
    title: "HR Dashboard",
    icon: LayoutDashboardIcon,
    to: "/hr/dashboard",
    external: false,
  },
  {
    title: "Leave Management",
    icon: CalendarIcon,
    to: "/hr/leave",
    external: false,
  },
  {
    title: "Employee Management",
    icon: UserCircleIcon,
    to: "/hr/employees",
    external: false,
  },
  {
    title: "Attendance QR",
    icon: CalendarIcon,
    to: "/hr/attendance-qr",
    external: false,
  },
  {
    title: "Payroll",
    icon: CurrencyDollarIcon,
    to: "/hr/payroll",
    external: false,
  },
  {
    title: "Structure",
    icon: UserCircleIcon,
    to: "/hr/structure",
    external: false,
  },
  { header: "Employee Self Service" },
  {
    title: "Dashboard",
    icon: LayoutDashboardIcon,
    to: "/employee/dashboard",
    external: false,
  },
  {
    title: "Attendance",
    icon: CalendarIcon,
    to: "/employee/attendance",
    external: false,
  },
  {
    title: "Leave",
    icon: TicketIcon,
    to: "/employee/leave",
    external: false,
  },
  {
    title: "Payslip",
    icon: CurrencyDollarIcon,
    to: "/employee/payslip",
    external: false,
  },
  {
    title: "Profile",
    icon: UserCircleIcon,
    to: "/employee/profile",
    external: false,
  },
];
export default sidebarItem;
