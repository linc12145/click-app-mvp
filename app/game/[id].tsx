import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Linking from 'expo-linking';
import { useState } from 'react';

export default function GameDetails() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    // Mock State - in real app would rely on API data
    const [status, setStatus] = useState<'Pending' | 'Active' | 'Complete'>('Pending');

    // Hardcoded for demo based on mock dashboard data
    const game = {
        id: '1',
        title: 'Darts vs Mike',
        amount: 50,
        opponent: 'Mike',
        description: 'Winner takes all. Best of 3.',
    };

    const handlePay = (app: 'venmo' | 'cashapp') => {
        // Deep links
        // Venmo: venmo://paycharge?txn=pay&recipients=username&amount=50&note=ClickBet
        // CashApp: https://cash.app/$username/50

        // For MVP Demo, we just open the app or a web fallback
        let url = '';
        if (app === 'venmo') url = 'venmo://paycharge?txn=pay&note=ClickBet';
        if (app === 'cashapp') url = 'https://cash.app/';

        Linking.openURL(url).catch(() => {
            Alert.alert('Error', `Could not open ${app}. Make sure it is installed.`);
        });
    };

    const confirmPayment = () => {
        Alert.alert(
            "Confirm Deposit",
            "Have you successfully sent the funds?",
            [
                { text: "No", style: "cancel" },
                {
                    text: "Yes, I Paid",
                    onPress: () => setStatus('Active')
                }
            ]
        );
    };

    return (
        <View className="flex-1 bg-primary">
            <SafeAreaView className="flex-1">

                {/* Header */}
                <View className="px-6 py-4 flex-row justify-between items-center">
                    <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 bg-gray-800 rounded-full items-center justify-center">
                        <Text className="text-white text-xl">←</Text>
                    </TouchableOpacity>
                    <Text className="text-gray-400 font-bold uppercase tracking-widest">Game #{id}</Text>
                    <View className="w-10" />
                </View>

                <ScrollView className="flex-1 px-6 pt-4">

                    {/* Status Card */}
                    <View className="items-center mb-8">
                        <View className={`px-4 py-2 rounded-full border ${status === 'Active' ? 'bg-green-500/20 border-green-500' : 'bg-yellow-500/20 border-yellow-500'}`}>
                            <Text className={`${status === 'Active' ? 'text-green-400' : 'text-yellow-400'} font-bold uppercase tracking-wider`}>
                                {status === 'Active' ? '● Bet Active' : '● Awaiting Deposit'}
                            </Text>
                        </View>
                    </View>

                    {/* Title & Amount */}
                    <View className="items-center mb-10">
                        <Text className="text-white text-4xl font-bold text-center mb-2">{game.title}</Text>
                        <Text className="text-gray-400 text-lg mb-6">vs {game.opponent}</Text>
                        <Text className="text-6xl text-neon font-bold">${game.amount}</Text>
                        <Text className="text-gray-500 text-sm mt-2">Total Pot: ${game.amount * 2}</Text>
                    </View>

                    {/* Actions */}
                    {status === 'Pending' ? (
                        <View>
                            <Text className="text-white font-bold mb-4 ml-1">Deposit Funds via:</Text>
                            <TouchableOpacity onPress={() => handlePay('venmo')} className="bg-[#008CFF] py-4 rounded-xl items-center mb-4 flex-row justify-center relative shadow-lg shadow-blue-500/30">
                                <Text className="text-white font-bold text-lg">Venmo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handlePay('cashapp')} className="bg-[#00D632] py-4 rounded-xl items-center mb-8 flex-row justify-center relative shadow-lg shadow-green-500/30">
                                <Text className="text-white font-bold text-lg">Cash App</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={confirmPayment} className="border border-white/20 py-4 rounded-xl items-center">
                                <Text className="text-gray-400 font-bold">I have already paid</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View>
                            <BlurView intensity={20} tint="dark" className="rounded-2xl p-6 border border-white/10 mb-6">
                                <Text className="text-gray-300 text-center leading-6">
                                    Funds are secured. Good luck! Once the game is over, both players must confirm the result to release the payout.
                                </Text>
                            </BlurView>

                            <TouchableOpacity className="bg-white/10 py-4 rounded-xl items-center mb-4">
                                <Text className="text-white font-bold">Submit Result</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                </ScrollView>
            </SafeAreaView>
            <StatusBar style="light" />
        </View>
    );
}
