import {onThemeChange, onShowCustomThemeView, onThemeInit} from './theme';
import {onRefreshPopular, onLoadMorePopular, onFlushPopularFavorite} from './popular';
import {onLoadMoreTrending, onRefreshTrending, onFlushTrendingFavorite} from './trending';
import {onLoadFavoriteData} from './favorite';
import {onLoadLanguage} from './language';
import {onSearch, onLoadMoreSearch, onSearchCancel} from './search';

export default {
    onThemeChange,
    onRefreshPopular,
    onLoadMorePopular,
    onLoadMoreTrending,
    onRefreshTrending,
    onLoadFavoriteData,
    onFlushPopularFavorite,
    onFlushTrendingFavorite,
    onLoadLanguage,
    onShowCustomThemeView,
    onThemeInit,
    onSearch,
    onLoadMoreSearch,
    onSearchCancel,
}