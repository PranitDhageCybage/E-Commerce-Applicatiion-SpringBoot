package com.app.service;

import com.app.customExceptions.ResourceNotFoundException;
import com.app.dao.CartRepository;
import com.app.dao.UserRepository;
import com.app.pojo.Cart;
import com.app.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class CartServiceImpl implements ICartService {

    @Autowired
    CartRepository cartRepo;

    @Autowired
    UserRepository userRepo;

    @Override
    public List<Cart> getAllCartItems(int user_id) {
        if (userRepo.existsById(user_id)) {
            User user = userRepo.findById(user_id).get();
            return cartRepo.findAllByUser(user);
        }
        throw new ResourceNotFoundException("Cart Item not found for given user Id : " + user_id);
    }

    @Override
    public Cart addCartItem(Cart item) {
        return cartRepo.save(item);
    }

    @Override
    public Cart updateCartItemQty(int cart_id, int item_qty) {
        if (cartRepo.existsById(cart_id)) {
            Cart oldCart = cartRepo.findById(cart_id).get();
            if (item_qty != oldCart.getCartQuantity()) oldCart.setCartQuantity(item_qty);
            return cartRepo.save(oldCart);
        }
        throw new ResourceNotFoundException("Cart Item not found for given cart Id : " + cart_id);
    }

    @Override
    public String deleteCartItem(int cart_id) {
        if (cartRepo.existsById(cart_id)) {
            cartRepo.deleteById(cart_id);
            return "Item deleted successfully";
        }
        throw new ResourceNotFoundException("Cart Item not found for given cart Id : " + cart_id);
    }

    @Override
    public String deleteAllCartItemByUser(int user_id) {
        if (userRepo.existsById(user_id)) {
            User user = userRepo.findById(user_id).get();
            cartRepo.deleteAllByUser(user);
            return "Deleted All items from cart";
        }
        throw new ResourceNotFoundException("Cart items not found for given user Id : " + user_id);
    }
}
