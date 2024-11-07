import { useState, useEffect } from 'react';

const urlCategories = 'https://famous-quotes4.p.rapidapi.com/';
const url = 'https://famous-quotes4.p.rapidapi.com/random?category=all&count=1';

const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '78d40ba26cmsh36a7a0b57dfd449p1c514bjsnb7282acad6dc',
		'x-rapidapi-host': 'famous-quotes4.p.rapidapi.com'
	}
};

export default function Home() {
    const [currentQuote, setCurrentQuote] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        fetch(url, options)
            .then(response => response.json())
            .then(data => setCurrentQuote(data[0]))
            .catch(error => console.error('Error fetching quotes:', error));
    }, []);
   
    useEffect(() => {
        fetch(urlCategories, options)
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching quotes:', error));
    }, []);
  
    const quoteByCategory = () => {
        fetch(`https://famous-quotes4.p.rapidapi.com/random?category=${selectedCategory}&count=1`, options)
            .then(response => response.json())
            .then(data => setCurrentQuote(data[0]))
            .catch(error => console.error(`Error fetching quotes with category ${selectedCategory}:`, error));
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Quote of a day</h1>
            <h3>{currentQuote.text}</h3> 
            <p>{currentQuote.author}</p>
            <div>
                <label htmlFor='select'>Choose category</label>
            
                <select id='select' value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} style={{ marginRight: '10px' }}>
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
                <button onClick={quoteByCategory} style={{ marginTop: '10px' }}>Get quote with this category</button>
            </div>
        </div>
    );
}
