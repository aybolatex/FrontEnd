import sortReducers from './sortReducers';
import postsReducer, {postsModule} from "../pages/PostsPage/PostsDucks";

export default sortReducers({
  [postsModule]: postsReducer
});
