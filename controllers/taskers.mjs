export default function taskers(db) {
  const getTaskers = async (req, res) => {
    console.log('request to render list of categories');

    // set object to store data to be sent to response
    const data = {};

    try {
      const taskerList = await db.Taskers.findAll();

      data.taskerList = taskerList;
      res.send(data);
    } catch (error) {
      console.log(error);
      // send error to browser
      res.status(500).send(error);
    }
  };

  return { getTaskers };
}
