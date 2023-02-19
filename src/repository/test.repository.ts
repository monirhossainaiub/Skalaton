import Test, { ITest } from "../model/test.model";

const Sequelize = require("sequelize");

class TestRepository{
    private static testRepository: TestRepository;
    connString: string = "";

    private constructor(){}

    public static getInstance(){
        if(!this.testRepository){
            this.testRepository = new TestRepository();
        }
        return this.testRepository;
    }

    public async getTests(): Promise<ITest[]>{
        let tests: ITest[] = [];
        try {
            tests = await Test.findAll();
        } catch (error) {
            console.log(error);
            throw new Error("error");
        }
        return tests;
    }

    public async getTest(id: number): Promise<ITest>{
        try {
            let testdb = await Test.findByPk(id);
            return testdb;
        } catch (error) {
            throw error;
        }
    }

    public async createTest(test: ITest | null): Promise<ITest> {
        try {
            console.log(test)
            let testdb = await Test.create(test);
            return testdb;
        } catch (error) {
            throw error;
        }
    }

    public async updateTest(test: ITest): Promise<ITest> {
        try {
            let result;
            let testdb = await Test.findByPk(test.id);
            if(testdb){
                result = await Test.update(
                    { name: test.name },
                    { where: { id: test.id } }
                  )
            }
            return result;
        } catch (error) {
            throw error;
        }
    }

    public async deleteTest(test: ITest): Promise<ITest> {
        try {
            let result;
            let testdb = await Test.findByPk(test.id);
            if(testdb){
                result = await Test.destroy(
                    { where: { id: test.id } }
                  )
            }
            return result;
        } catch (error) {
            throw error;
        }
    }
}

export default TestRepository;