export default class Likes{
      constructor(){
            this.likes = [];
      }
      //ADD
      addLike(id, title, author, img){
            const like = {id, title, author , img};
            this.likes.push(like);

            //persist data on localStorage
            this.stockIn();
            return like;
      }
      //DELETE
      deleteLike(id){
            const index = this.likes.findIndex(el => el.id === id);
            this.likes.splice(index, 1);

            //persist data on localStorage
            this.stockIn();
      }
      //LIKED-RECIPE OPTION
      isLiked(id){
            //Is it liked?
            return this.likes.findIndex(el => el.id === id) !== -1; 
      }
      //NUMBER LIKES
      getNumLikes(){
            return this.likes.length;
      }
      //STORAGE DATA
      stockIn(){
            localStorage.setItem('likes', JSON.stringify(this.likes));
      }
      //STORAGE STATUS
      stockStatus () {
            const currentStock = JSON.parse(localStorage.getItem('likes'));
            if(currentStock) this.likes = currentStock;
      }
}
