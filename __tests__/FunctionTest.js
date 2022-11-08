const App = require("../src/App");
const MissionUtils = require("@woowacourse/mission-utils");

const mockQuestions = (answers) => {
  MissionUtils.Console.readLine = jest.fn();
  answers.reduce((acc, input) => {
    return acc.mockImplementationOnce((question, callback) => {
      callback(input);
    });
  }, MissionUtils.Console.readLine);
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickNumberInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

describe("기능 테스트", () => {
  test("[기능 1] 게임 시작 문구 출력", () => {
    const logSpy = getLogSpy();

    const app = new App();
    app.printStartGame();

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining("숫자 야구 게임을 시작합니다.")
    );
  });

  test("[기능 2] 랜덤 수 생성 및 저장", () => {
    const randoms = [1, 5, 5, 5, 8, 9];

    const app = new App();

    mockRandoms(randoms);

    expect(app.createRandomNumber()).toStrictEqual([1, 5, 8]);
  });

  test("[기능 3] 입력 문구 출력", () => {
    const logSpy = getLogSpy();

    const app = new App();
    app.requireInputRandomNumber();

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining("숫자를 입력해주세요 : ")
    );
  });

  test("[기능 4] 게임 예상 숫자 입력 받은 후 예외사항 판단", () => {
    const answers = ["509"];

    mockQuestions(answers);

    expect(() => {
      const app = new App();
      app.requireInputRandomNumber();
    }).toThrow();
  });
});
