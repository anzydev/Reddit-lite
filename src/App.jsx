

import { useState, useEffect } from 'react'

function App() {
  const [posts, setPosts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [subreddit, setSubreddit] = useState('aww') 
  useEffect(() => {
    setPosts([])
    fetch(⁠ https:
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.data.children)
      })
  }, [subreddit]) 
  const filteredPosts = posts.filter((item) => {
    return item.data.title.toLowerCase().includes(searchQuery.toLowerCase())
  })

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f0f2f5', margin: 0, padding: 0, minHeight: '100vh' }}>
      
      <div style={{ backgroundColor: '#ff4500', color: 'white', padding: '20px', textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ margin: 0 }}>Reddit Clone</h1>
        <p>Basic version</p>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 20px', textAlign: 'center', marginBottom: '20px' }}>
        
        <div style={{ marginBottom: '15px' }}>
          <button onClick={() => setSubreddit('aww')} style={{ padding: '8px 15px', marginRight: '10px', cursor: 'pointer', borderRadius: '5px', border: '1px solid #ccc' }}>r/aww</button>
          <button onClick={() => setSubreddit('programming')} style={{ padding: '8px 15px', marginRight: '10px', cursor: 'pointer', borderRadius: '5px', border: '1px solid #ccc' }}>r/programming</button>
          <button onClick={() => setSubreddit('memes')} style={{ padding: '8px 15px', cursor: 'pointer', borderRadius: '5px', border: '1px solid #ccc' }}>r/memes</button>
        </div>

        <input 
          type="text" 
          placeholder={⁠ Search ${subreddit}... ⁠} 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '80%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 20px' }}>
        {posts.length === 0 ? <p style={{ textAlign: 'center' }}>Loading API data...</p> : null}
        
        {filteredPosts.map((item) => {
          const post = item.data
          return (
            <div key={post.id} style={{ backgroundColor: 'white', border: '1px solid #ccc', padding: '15px', marginBottom: '15px', borderRadius: '5px' }}>
              <h3 style={{ marginTop: 0, color: '#333' }}>{post.title}</h3>
              <p style={{ color: '#888', fontSize: '14px' }}>Author: {post.author} | Upvotes: {post.ups}</p>
            
              {post.thumbnail && post.thumbnail.startsWith('http') ? (
                <img src={post.thumbnail} alt="thumbnail" style={{ marginTop: '10px', borderRadius: '5px', maxWidth: '100%' }} />
              ) : null}
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default App
