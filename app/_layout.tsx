import { Stack } from 'expo-router';
import { NativeWindStyleSheet } from "nativewind";
import "../global.css";

NativeWindStyleSheet.setOutput({
    default: "native",
});

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
    );
}
