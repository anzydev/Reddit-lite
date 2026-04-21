import { useState, useEffect } from 'react'

function App() {
  const [ my_data , setmy_data] = useState( [] )
  const [ num, setNum ] = useState(0)
  const [ searchStuff  , set_searchStuff ] = useState('')

  useEffect( () => {
    fetch(`https://dummyjson.com/posts?limit=10&skip=${num}`)
      .then(res => res.json())
      .then( data1 => {
        setmy_data(old => {
            let cool_new_posts = data1.posts.filter( p => !old.some( o => o.id === p.id) )
            
            
            return [...old, ...cool_new_posts]
        })
      })
  }, [ num ])

  useEffect(() => {
    let doScrollThing = () => {
      
      if ( window.innerHeight + window.scrollY >= document.body.offsetHeight - 50 ) {
           setNum( n => n + 10 )
      }
    }
    window.addEventListener( 'scroll', doScrollThing )
    return () => window.removeEventListener('scroll', doScrollThing )
  }, [])

  let good_posts = my_data.filter( item_idk => 
    item_idk.title.toLowerCase().includes(searchStuff.toLowerCase()) || 
    item_idk.body.toLowerCase().includes(searchStuff.toLowerCase())
  )

  return (
    <div className="bg-[#0b1416] text-[#d7dadc] min-h-screen font-sans">
      <nav className="bg-[#1a1a1b] border-b border-[#343536] py-2 px-4 flex items-center justify-between sticky top-0 z-50">
        
        <div className="flex items-center gap-2 w-1/4">
          <div className="flex bg-[#ff4500] text-white rounded-full w-8 h-8 items-center justify-center font-bold">r</div>
          <h1 className="text-xl font-bold hidden sm:block text-white">reddit</h1>
        </div>

        <div className="w-2/4 max-w-xl flex bg-[#272729] hover:bg-[#1a1a1b] border border-[#343536] hover:border-gray-300 rounded-full px-4 py-2 items-center transition-colors">
          <span className="text-gray-400 mr-2">🔍</span>
          <input type="text" placeholder="Find anything" className="bg-transparent outline-none w-full text-sm text-white" value={ searchStuff } onChange={ e => set_searchStuff(e.target.value) } />
        </div>

        <div className="flex items-center gap-4 w-1/4 justify-end">
          <button className="hidden sm:flex items-center gap-2 hover:bg-[#272729] px-3 py-1.5 rounded-full text-gray-400">
            <span className="text-lg">⊕</span> <span className="text-sm font-semibold">Create</span>
          </button>
          <button className="hover:bg-[#272729] p-2 rounded-full text-lg text-gray-400">💬</button>
          <button className="hover:bg-[#272729] p-2 rounded-full text-lg text-gray-400">🔔</button>
          <div className="w-8 h-8 rounded-full bg-[#ff4500] ml-2 text-white flex items-center justify-center font-bold">u</div>
        </div>
      </nav>

      <div className="max-w-[1200px] mx-auto pt-4 px-4 flex justify-center gap-6">
        <aside className="w-64 hidden md:block border-r border-[#343536] pr-4 h-full sticky top-[70px]">
          <ul className="text-sm space-y-1 mt-2">
            <li className="hover:bg-[#272729] cursor-pointer px-3 py-2 rounded-lg font-semibold flex items-center gap-3">🏠 Home</li>
            <li className="hover:bg-[#272729] cursor-pointer px-3 py-2 rounded-lg font-semibold flex items-center gap-3">↗ Popular</li>
            <li className="hover:bg-[#272729] cursor-pointer px-3 py-2 rounded-lg font-semibold flex items-center gap-3">📰 News</li>
          </ul>
          <hr className="border-[#343536] my-4" />
          <p className="text-gray-400 px-3 py-2 uppercase text-xs font-bold tracking-wider">Custom Feeds</p>
          <ul className="text-sm space-y-1">
            <li className="hover:bg-[#272729] cursor-pointer px-3 py-2 rounded-lg font-semibold flex items-center gap-3">➕ Create Custom Feed</li>
          </ul>
        </aside>

        <main className="w-full max-w-2xl py-2">
          {good_posts.length === 0 ? <p className="text-center text-gray-400 font-medium">Wait karo API se data aane ka🙏</p> : null}
          
          {good_posts.map(( thing123 ) => {
            let likesCount = thing123.reactions ? thing123.reactions.likes : 0
            return (
              <div key={thing123.id} className="bg-[#0b1416] sm:bg-[#1a1a1b] sm:border border-[#343536] hover:border-gray-500 rounded-xl mb-3 cursor-pointer transition-colors pt-3">
                <div className="px-4 pb-2">
                  <div className="flex items-center gap-2 mb-2"> <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs text-white">r</div> <p className="text-xs font-bold hover:underline text-gray-200">r/community</p> <span className="text-gray-500 text-xs">• 3 hr. ago</span> </div>
                  <h3 className="text-lg font-bold text-gray-100 mb-2">{thing123.title}</h3>
                  <div className="text-sm text-gray-300 bg-black/40 p-4 rounded-lg my-3 border border-gray-800">{thing123.body}</div>
                </div>

                <div className="px-4 py-2 flex items-center gap-2 text-xs font-bold text-gray-300 pb-3">
                  <div className="flex items-center bg-[#272729] rounded-full">
                    <button className="p-2 px-3 hover:bg-gray-600 hover:text-[#ff4500] rounded-l-full transition-colors text-lg">⇧</button>
                    <span className="px-1">{likesCount > 999 ? (likesCount/1000).toFixed(1) + 'k' : likesCount}</span>
                    <button className="p-2 px-3 hover:bg-gray-600 hover:text-blue-500 rounded-r-full transition-colors text-lg">⇩</button>
                  </div>
                  <button className="flex items-center gap-2 bg-[#272729] hover:bg-gray-600 px-4 py-2 rounded-full transition-colors">📝 <span className="hidden sm:inline">Comments</span></button>
                  <button className="flex items-center gap-2 bg-[#272729] hover:bg-gray-600 px-4 py-2 rounded-full transition-colors">↗ Share</button>
                </div>
              </div>
            )
          })}
        </main>

        <aside className="w-[320px] hidden lg:block bg-[#1a1a1b] border border-[#343536] rounded-xl h-fit p-4 sticky top-[70px] mt-2">
          <h2 className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">Recent Posts</h2>
          <div className="text-sm hover:bg-[#272729] p-2 rounded-lg cursor-pointer flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-xs text-white">c</div>
              <div>
                <span className="text-gray-200">r/ChatGPT</span>
                <p className="text-xs text-gray-500">5d ago</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default App
