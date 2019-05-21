import { Icon } from 'antd';
import { CSSProperties, ReactNode } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import LoadingBar from 'react-redux-loading-bar';
import React, { Component } from 'reactn';
import { AutoCompleteInput } from './AutoCompleteInput';
import './Toolbar.css';

type ToolbarProps = {
    showDrawer: () => void
}

type ExtendedToolbarProps = ToolbarProps & WithTranslation;

interface ToolbarState {
    searchBarVisibility: boolean
}

class Toolbar extends Component<ExtendedToolbarProps, ToolbarState> {

    constructor(props: ExtendedToolbarProps) {
        super(props);

        this.state = {
            searchBarVisibility: false
        };

        this.showSearchBar = this.showSearchBar.bind(this);
    }

    showSearchBar(): void {
        if (this.state.searchBarVisibility) {
            this.setState({ searchBarVisibility: false });
            document.documentElement.style.setProperty('--toolbar-height', '64px');
            document.documentElement.style.setProperty('--toolbar-line-height', '64px');
        } else  {
            this.setState({ searchBarVisibility: true });
            document.documentElement.style.setProperty('--toolbar-height', '128px');
            document.documentElement.style.setProperty('--toolbar-line-height', '64px');
        }
    }

    render(): ReactNode {
        const { t, showDrawer } = this.props;
        const { searchBarVisibility } = this.state;

        let menuSectionStyle: CSSProperties = (searchBarVisibility) ? { display: 'flex' } : {};
        let searchSectionStyle: CSSProperties = (searchBarVisibility) ? { display : 'flex', order: 5, padding: 0 } : {};
        let actionSectionStyle: CSSProperties = (searchBarVisibility) ? { display: 'flex' } : {};
        let searchActionIconType: string = (searchBarVisibility) ? 'close' : 'search';

        return (
            <div className='toolbar'>
                <LoadingBar className='loadingBar' scope='main'/>
                <div className='toolbarContent'>
                    <div className='toolbarMenuSection' style={ menuSectionStyle }>
                        <Icon className='toolbarAction' type='menu' onClick={ showDrawer }/>
                        <span className='logo toolbarLogo'>{ t('appName') }</span>
                    </div>
                    <div className='toolbarSearchSection' style={ searchSectionStyle }>
                        <AutoCompleteInput/>
                    </div>
                    <div className='toolbarActionSection' style={ actionSectionStyle }>
                        <Icon className='toolbarAction' type={ searchActionIconType } onClick={ this.showSearchBar }/>
                    </div>
                </div>
            </div>
        );
    }
}

const ToolbarWithTranslation = withTranslation()(Toolbar);

export { ToolbarWithTranslation as Toolbar };
