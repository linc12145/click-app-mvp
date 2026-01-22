import { View, Text, TextInput, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useState, useRef } from 'react';
import { BlurView } from 'expo-blur';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CreateGame() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [eventName, setEventName] = useState('');
    const [opponent, setOpponent] = useState('');
    const [amount, setAmount] = useState('');

    const fadeAnim = useRef(new Animated.Value(1)).current;

    const nextStep = () => {
        Animated.sequence([
            Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
            Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
        ]).start();

        setTimeout(() => setStep(s => s + 1), 200);
    };

    const createGame = () => {
        // In a real app, this would query the API
        router.replace('/');
    };

    return (
        <View className="flex-1 bg-primary">
            <SafeAreaView className="flex-1">
                <View className="px-6 py-4">
                    <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 bg-gray-800 rounded-full items-center justify-center mb-4">
                        <Text className="text-white text-xl">←</Text>
                    </TouchableOpacity>
                </View>

                <Animated.View style={{ opacity: fadeAnim }} className="flex-1 px-6 justify-center">
                    {step === 1 && (
                        <View>
                            <Text className="text-neon font-bold mb-2 uppercase tracking-wide">Step 1</Text>
                            <Text className="text-white text-4xl font-bold mb-8">What are you betting on?</Text>
                            <TextInput
                                placeholder="e.g. Darts vs Mike"
                                placeholderTextColor="#6B7280"
                                className="text-white text-2xl border-b border-gray-700 py-4 mb-8"
                                autoFocus
                                value={eventName}
                                onChangeText={setEventName}
                            />
                            <TouchableOpacity onPress={nextStep} className="bg-accent py-4 rounded-xl items-center shadow-lg shadow-accent/20">
                                <Text className="text-white font-bold text-lg">Next</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {step === 2 && (
                        <View>
                            <Text className="text-neon font-bold mb-2 uppercase tracking-wide">Step 2</Text>
                            <Text className="text-white text-4xl font-bold mb-8">Who are you playing?</Text>
                            <TextInput
                                placeholder="e.g. @username or Name"
                                placeholderTextColor="#6B7280"
                                className="text-white text-2xl border-b border-gray-700 py-4 mb-8"
                                autoFocus
                                value={opponent}
                                onChangeText={setOpponent}
                            />
                            <TouchableOpacity onPress={nextStep} className="bg-accent py-4 rounded-xl items-center shadow-lg shadow-accent/20">
                                <Text className="text-white font-bold text-lg">Next</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {step === 3 && (
                        <View>
                            <Text className="text-neon font-bold mb-2 uppercase tracking-wide">Step 3</Text>
                            <Text className="text-white text-4xl font-bold mb-8">How much is at stake?</Text>
                            <View className="flex-row items-center border-b border-gray-700 py-4 mb-8">
                                <Text className="text-white text-4xl font-bold mr-2">$</Text>
                                <TextInput
                                    placeholder="0"
                                    placeholderTextColor="#6B7280"
                                    className="text-white text-4xl font-bold flex-1"
                                    keyboardType="numeric"
                                    autoFocus
                                    value={amount}
                                    onChangeText={setAmount}
                                />
                            </View>
                            <TouchableOpacity onPress={createGame} className="bg-neon py-4 rounded-xl items-center shadow-lg shadow-accent/20">
                                <Text className="text-primary font-bold text-lg">Create Game</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Animated.View>

            </SafeAreaView>
            <StatusBar style="light" />
        </View>
    );
}
