const userRepository = require('../userRepository');

const test = async () => {
    const responseData = await userRepository.signUp('panupongdeve', '123456');

    await userRepository.setPasswordHash(responseData.profile.passwordHash);
    await userRepository.setIsTester(true);

    const getToken = await userRepository.getToken('panupongdeve', '123456');
    console.log('getToken', getToken);

    const getTokenIncorrect = await userRepository.getToken('panupongdeve', '12345678');
    console.log('getTokenIncorrect', getTokenIncorrect);
}

test();