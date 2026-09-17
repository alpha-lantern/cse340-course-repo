const showHomePage = async (req, res) => {
    const title = 'Home';
    const description = 'Welcome to the CSE 340 Service Network';
    res.render('home', { title, description });
};

export { showHomePage };