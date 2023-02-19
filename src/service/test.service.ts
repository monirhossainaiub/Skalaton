import { ITest } from "../model/test.model";
import TestRepository from "../repository/test.repository";

class TestService {
    static testService: TestService;
    testRepository: TestRepository = TestRepository.getInstance();
    private constructor(){}

    public static getInstance(){
        if(!this.testService){
            this.testService = new TestService();
        }
        return this.testService;
    }

    public async getTest(id: number): Promise<ITest> {
        try {
            let result = await this.testRepository.getTest(id);
            return result;
        } catch (error) {
            throw error;
        }
    }

    public async getTests(): Promise<ITest[]> {
        try {
            const tests = await this.testRepository.getTests();
            return tests;
        } catch (error) {
            throw error;
        }
    }

    public async createTest(test: ITest | null): Promise<ITest> {
        try {
            return await this.testRepository.createTest(test);
        } catch (error) {
            throw error;
        }
    }

    public async updateTest(test: ITest): Promise<ITest>{
        try {
            const testdb = await this.testRepository.updateTest(test);
            return testdb;
        } catch (error) {
            throw error;
        }
    }

    public async deleteTest(test: ITest): Promise<ITest>{
        try {
            const testdb = await this.testRepository.deleteTest(test);
            return testdb;
        } catch (error) {
            throw error;
        }
    }
}

export default TestService;