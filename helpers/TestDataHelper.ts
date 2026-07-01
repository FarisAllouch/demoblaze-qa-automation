export class TestDataHelper {
    static generateUser() {

        return {
            username: `test${Date.now()}`,
            password: 'Test12345!'
        };

    }
}