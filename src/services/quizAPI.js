import ax from "./axios.config";

const getAllQuiz = async () => {
  try {
    const res = await ax.get("quizzes/");

    if (/20[0-6]/g.test(res.status)) {
      return res.data;
    }
  } catch (error) {
    return [];
  }
};

const toExport = { getAllQuiz };

export default toExport;
