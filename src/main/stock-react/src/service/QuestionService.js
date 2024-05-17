import axios from 'axios';

const BOARD_API_BASE_URL = "http://localhost:8085/question"; 

class QuestionService {

    getBoards() {
        return axios.get(BOARD_API_BASE_URL);
    }
}

export default new QuestionService();