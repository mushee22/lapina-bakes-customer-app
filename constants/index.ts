import { HomeIcon, ShoppingCart, UserIcon } from "lucide-react-native";

export const bottomBarItems = [
    {
        name: 'Home',
        icon: HomeIcon,
        route: 'home',
        options: {
            headerShown: true,
            backButtonVisible: false,
        }
    },
    {
        name: "Orders",
        icon: ShoppingCart,
        route: "order",
        options: {
            popToTopOnBlur: true,
            headerShown: false,
        }
    },
    {
        name: 'Profile',
        icon: UserIcon,
        route: 'profile',
        options: {
            headerShown: true,
            backButtonVisible: false,
        }
    },
]

export const deliveryBoysBottomBar = [
    {
        name: 'Home',
        icon: HomeIcon,
        route: 'home',
        options: {
            headerShown: true,
            backButtonVisible: false,
        }
    },
    {
        name: 'Profile',
        icon: UserIcon,
        route: 'profile',
        options: {
            headerShown: true,
            backButtonVisible: false,
        }
    },
]


export const ALLOWED_ROLE = process.env.EXPO_PUBLIC_ALLOWED_ROLES

export const CURRENCY = '₹';
