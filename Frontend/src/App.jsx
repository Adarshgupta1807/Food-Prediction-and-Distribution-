import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./features/auth/state/auth.context";
import { RestaurantProvider } from "./features/restaurant/state/restaurant.context";
import { DonationProvider } from "./features/donation/state/donation.context";
import { NgoProvider } from "./features/ngo/state/ngo.context";
import AppRoutes from "./routes/AppRoutes";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <RestaurantProvider>
                    <DonationProvider>
                        <NgoProvider>
                            <AppRoutes />
                        </NgoProvider>
                    </DonationProvider>
                </RestaurantProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
