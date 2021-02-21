export default function categories(db) {
  const getCategories = async (req, res) => {
    console.log('request to render list of categories');

    // set object to store data to be sent to response
    const data = {};

    try {
      const categoriesList = await db.Categories.findAll();
      data.categoriesList = categoriesList;
      res.send(data);
    } catch (error) {
      console.log(error);
      // send error to browser
      res.status(500).send(error);
    }
  };

  return { getCategories };
}
