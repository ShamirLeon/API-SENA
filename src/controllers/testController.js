import testRepository from '../repostories/testRepository.js'

const testController = {
  test: (req, res) => {
    res.json(testRepository.get(1))
  }
}

export default testController
