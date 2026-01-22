import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Link, useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock Data
const ACTIVE_GAMES = [
    { id: '1', title: 'Darts vs Mike', amount: 50, status: 'Active', opponent: 'Mike' },
    { id: '2', title: 'Pool vs Sarah', amount: 20, status: 'Pending', opponent: 'Sarah' },
];

export default function Dashboard() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-primary">
            <SafeAreaView className="flex-1">
                {/* Header */}
                <View className="px-6 py-4 flex-row justify-between items-center">
                    <View>
                        <Text className="text-gray-400 text-sm font-medium">Welcome back,</Text>
                        <Text className="text-white text-3xl font-bold">Linc</Text>
                    </View>
                    <View className="w-10 h-10 bg-gray-700 rounded-full border border-gray-600 items-center justify-center">
                        <Text className="text-white font-bold">L</Text>
                    </View>
                </View>

                {/* Stats Card */}
                <View className="px-6 mt-4 mb-8">
                    <View className="bg-gray-800/50 rounded-3xl p-6 border border-white/10 overflow-hidden relative">
                        <Text className="text-gray-400 mb-1">Total in Play</Text>
                        <Text className="text-4xl text-neon font-bold">$70.00</Text>
                        <View className="absolute right-0 bottom-0 opacity-20 transform translate-x-4 translate-y-4">
                            <Text className="text-8xl">🎯</Text>
                        </View>
                    </View>
                </View>

                {/* Active Games List */}
                <View className="flex-1 px-6 bg-gray-900/40 rounded-t-[40px] pt-8">
                    <Text className="text-white text-xl font-bold mb-4">Active Games</Text>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {ACTIVE_GAMES.map((game) => (
                            <Link key={game.id} href={`/game/${game.id}`} asChild>
                                <TouchableOpacity className="mb-4">
                                    <BlurView intensity={20} tint="dark" className="rounded-2xl overflow-hidden border border-white/10">
                                        <View className="p-4 flex-row items-center justify-between bg-white/5">
                                            <View className="flex-row items-center space-x-4">
                                                <View className="w-12 h-12 rounded-full bg-gray-700 items-center justify-center">
                                                    <Text className="text-xl">🎱</Text>
                                                </View>
                                                <View>
                                                    <Text className="text-white font-bold text-lg">{game.title}</Text>
                                                    <Text className="text-gray-400 text-xs uppercase tracking-wider">{game.status}</Text>
                                                </View>
                                            </View>
                                            <View>
                                                <Text className="text-accent font-bold text-xl">${game.amount}</Text>
                                            </View>
                                        </View>
                                    </BlurView>
                                </TouchableOpacity>
                            </Link>
                        ))}
                    </ScrollView>
                </View>

                {/* Floating Action Button */}
                <View className="absolute bottom-8 right-6">
                    <Link href="/game/create" asChild>
                        <TouchableOpacity className="w-16 h-16 bg-accent rounded-full items-center justify-center shadow-lg shadow-accent/50">
                            <Text className="text-white text-4xl font-light mb-1">+</Text>
                        </TouchableOpacity>
                    </Link>
                </View>

            </SafeAreaView>
            <StatusBar style="light" />
        </View>
    );
}
