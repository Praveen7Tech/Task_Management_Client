const Loading = () => {
  return (
    <div>
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    </div>
  )
}

export default Loading