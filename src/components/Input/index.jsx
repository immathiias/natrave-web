export const Input = ({ name, label, error, ...props }) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="text-sm text-grey-500 font-bold mb-2">{label}</label>
    <input {...props} name={name} id={name} className={`border border-grey-700 rounded-xl py-3 px-3 focus:outline focus:outline-1 ${error && 'border-red-300'}`} />
    <span className="p-2 text-sm text-red-300">{error}</span>
  </div>

)