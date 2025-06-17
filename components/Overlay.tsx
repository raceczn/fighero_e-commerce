const Overlay = ({ category }: { category: string }) => {
  return (
    <div className='absolute inset-0 flex items-center justify-center bg-black/0 backdrop-blur-none transition-all duration-300 group-hover:bg-black/60 group-hover:backdrop-blur-sm'>
      <span className='translate-y-8 text-2xl font-semibold text-white drop-shadow-md opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100'>
        {category}
      </span>
    </div>
  );
};

export default Overlay;
