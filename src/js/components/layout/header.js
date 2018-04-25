import React from 'react';

import TopMenu from './header/top-menu.js';
import Filters from './header/filters.js';

class Header extends React.Component {
	
	render(){
		
		return (
			<header class="cell shrink">
				<TopMenu title={this.props.title} />
				<Filters />
			</header>
		);
		
	}
	
}

export default Header;