import { ReactComponent as arrowLeft } from './svgs/arrow-left.svg'
import { ReactComponent as arrowRight } from './svgs/arrow-right.svg'
import { ReactComponent as back } from './svgs/back.svg'
import { ReactComponent as profile } from './svgs/profile.svg'
import { ReactComponent as spinner } from './svgs/spinner.svg'
import { ReactComponent as spinnerTwo } from './svgs/spinnerTwo.svg'
import { ReactComponent as logout } from './svgs/logout.svg'

const icons = {
  arrowLeft,
  arrowRight,
  back,
  profile,
  spinner,
  spinnerTwo,
  logout
}

export const Icon = ({ name, ...props }) => {
  const Element = icons[name]
  return <Element {...props} />
}